#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const REQUIRED_HEADERS = ["id", "name", "price", "description", "category", "images"];
const OPTIONAL_HEADERS = [
  "variants",
  "gstRate",
  "listPrice",
  "discountPercent",
  "availableColors",
  "productCode",
  "material",
  "packingType",
  "masterCarton",
  "customized",
  "minOrderQty",
];
const LIST_SEPARATOR = "|";

function parseArgs(argv) {
  const args = argv.slice(2);
  const csvPath = args.find((arg) => !arg.startsWith("--"));
  const outIndex = args.findIndex((arg) => arg === "--out");
  const outFile = outIndex >= 0 ? args[outIndex + 1] : null;

  if (!csvPath) {
    throw new Error(
      "Missing CSV path.\nUsage: npm run import:products -- ./products.csv [--out ./src/data/products.import.ts]"
    );
  }

  if (outIndex >= 0 && !outFile) {
    throw new Error("Missing value for --out");
  }

  return { csvPath, outFile };
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(value);
      value = "";

      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    if (row.some((cell) => cell.trim() !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

function splitList(value) {
  return value
    .split(LIST_SEPARATOR)
    .map((part) => part.trim())
    .filter(Boolean);
}

function toOptionalNumber(value) {
  if (!value) {
    return undefined;
  }
  const number = Number(value);
  if (Number.isNaN(number)) {
    return null;
  }
  return number;
}

function mapRows(rows) {
  if (rows.length < 2) {
    throw new Error("CSV must contain header row and at least one product row.");
  }

  const headerRow = rows[0].map((h) => h.trim());
  const unknownHeaders = headerRow.filter(
    (h) => !REQUIRED_HEADERS.includes(h) && !OPTIONAL_HEADERS.includes(h)
  );
  if (unknownHeaders.length > 0) {
    throw new Error(`Unsupported columns: ${unknownHeaders.join(", ")}`);
  }

  for (const header of REQUIRED_HEADERS) {
    if (!headerRow.includes(header)) {
      throw new Error(`Missing required column: ${header}`);
    }
  }

  const indexByHeader = Object.fromEntries(headerRow.map((h, idx) => [h, idx]));
  const products = [];

  for (let i = 1; i < rows.length; i += 1) {
    const source = rows[i];
    const get = (header) => (source[indexByHeader[header]] ?? "").trim();

    const id = get("id");
    const name = get("name");
    const price = Number(get("price"));
    const description = get("description");
    const category = get("category");
    const images = splitList(get("images"));
    const variantsRaw = get("variants");
    const availableColorsRaw = get("availableColors");
    const gstRate = toOptionalNumber(get("gstRate"));
    const listPrice = toOptionalNumber(get("listPrice"));
    const discountPercent = toOptionalNumber(get("discountPercent"));
    const minOrderQty = toOptionalNumber(get("minOrderQty"));
    const variants = variantsRaw ? splitList(variantsRaw) : [];
    const availableColors = availableColorsRaw ? splitList(availableColorsRaw) : [];

    if (!id || !name || !description || !category || images.length === 0) {
      throw new Error(`Row ${i + 1}: missing required product values.`);
    }
    if (Number.isNaN(price)) {
      throw new Error(`Row ${i + 1}: price must be numeric.`);
    }
    if (gstRate === null || listPrice === null || discountPercent === null || minOrderQty === null) {
      throw new Error(`Row ${i + 1}: one of gstRate/listPrice/discountPercent/minOrderQty is not numeric.`);
    }

    const product = {
      id,
      name,
      price,
      description,
      category,
      images,
      currency: "INR",
    };
    if (variants.length > 0) {
      product.variants = variants;
    }
    if (availableColors.length > 0) {
      product.availableColors = availableColors;
    }
    if (gstRate !== undefined) {
      product.gstRate = gstRate;
    }
    if (listPrice !== undefined) {
      product.listPrice = listPrice;
    }
    if (discountPercent !== undefined) {
      product.discountPercent = discountPercent;
    }
    if (minOrderQty !== undefined) {
      product.minOrderQty = minOrderQty;
    }

    const productCode = get("productCode");
    const material = get("material");
    const packingType = get("packingType");
    const masterCarton = get("masterCarton");
    const customized = get("customized");

    if (productCode) {
      product.productCode = productCode;
    }
    if (material) {
      product.material = material;
    }
    if (packingType) {
      product.packingType = packingType;
    }
    if (masterCarton) {
      product.masterCarton = masterCarton;
    }
    if (customized) {
      product.customized = customized;
    }

    products.push(product);
  }

  return products;
}

function toTs(products) {
  const body = JSON.stringify(products, null, 2);
  return [
    "// Generated by scripts/import-products-from-csv.mjs",
    "// Paste this array into `src/data/products.ts` as the value for `products`.",
    "",
    `export const productsImport = ${body};`,
    "",
  ].join("\n");
}

function main() {
  const { csvPath, outFile } = parseArgs(process.argv);
  const absoluteCsvPath = path.resolve(process.cwd(), csvPath);

  if (!fs.existsSync(absoluteCsvPath)) {
    throw new Error(`CSV file not found: ${absoluteCsvPath}`);
  }

  const csv = fs.readFileSync(absoluteCsvPath, "utf8");
  const rows = parseCsv(csv);
  const products = mapRows(rows);
  const output = toTs(products);

  if (outFile) {
    const absoluteOutPath = path.resolve(process.cwd(), outFile);
    fs.mkdirSync(path.dirname(absoluteOutPath), { recursive: true });
    fs.writeFileSync(absoluteOutPath, output);
    console.log(`Imported ${products.length} products -> ${absoluteOutPath}`);
    return;
  }

  console.log(output);
  console.error(`Imported ${products.length} products.`);
}

try {
  main();
} catch (error) {
  console.error(String(error instanceof Error ? error.message : error));
  process.exit(1);
}
