#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const METAL_KEYCHAIN_BUCKET = "metal-keychains";
const METAL_KEYCHAIN_PRODUCT_ID = "metal-keychain";
const DESTINATION_PREFIX = ""; // store files at the bucket root so URLs stay as /metal-keychains/<filename>

async function loadDotEnv() {
  const filePath = path.resolve(process.cwd(), ".env");
  try {
    const content = await fs.readFile(filePath, "utf8");
    return Object.fromEntries(
      content
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"))
        .map((line) => {
          const [key, ...rest] = line.split("=");
          const value = rest.join("=").trim().replace(/^"(.*)"$/, "$1");
          return [key, value];
        })
    );
  } catch {
    return {};
  }
}

function resolveEnv(key, fallback, dotEnvValues) {
  return process.env[key] ?? dotEnvValues[key] ?? fallback ?? null;
}

async function main() {
  const dotEnvValues = await loadDotEnv();
  const supabaseUrl =
    resolveEnv("SUPABASE_URL", null, dotEnvValues) ??
    resolveEnv("VITE_SUPABASE_URL", null, dotEnvValues);
  const serviceRoleKey =
    resolveEnv("SUPABASE_SERVICE_ROLE_KEY", null, dotEnvValues) ??
    resolveEnv("SUPABASE_SERVICE_ROLE", null, dotEnvValues);

  if (!supabaseUrl) {
    throw new Error(
      "Supabase URL not found. Set SUPABASE_URL or VITE_SUPABASE_URL (or add it to .env) before running this script."
    );
  }
  if (!serviceRoleKey) {
    throw new Error(
      "Supabase service role key required. Set SUPABASE_SERVICE_ROLE_KEY (or add it to .env)."
    );
  }

  const sourceDir = process.argv[2];
  if (!sourceDir) {
    throw new Error("Provide a directory containing the metal keychain images.");
  }

  const resolvedDir = path.resolve(process.cwd(), sourceDir);
  const dirStats = await fs.stat(resolvedDir);
  if (!dirStats.isDirectory()) {
    throw new Error("Supplied path must be a directory.");
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: bucketList } = await supabase.storage.listBuckets();
  if (!bucketList?.some((bucket) => bucket.name === METAL_KEYCHAIN_BUCKET)) {
    await supabase.storage.createBucket(METAL_KEYCHAIN_BUCKET, {
      public: true,
    });
  }

  const entries = await fs.readdir(resolvedDir);
  const imageFiles = entries.filter((name) => {
    return /\.(jpe?g|png|webp)$/i.test(name);
  });

  if (imageFiles.length === 0) {
    throw new Error("No image files were found in the provided directory.");
  }

  const uploadedUrls = [];
  const imageNames = [];
  for (const fileName of imageFiles) {
    const absolutePath = path.join(resolvedDir, fileName);
    const remotePath = DESTINATION_PREFIX ? `${DESTINATION_PREFIX}/${fileName}` : fileName;
    const fileBuffer = await fs.readFile(absolutePath);

    const { error: uploadError } = await supabase.storage
      .from(METAL_KEYCHAIN_BUCKET)
      .upload(remotePath, fileBuffer, { upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from(METAL_KEYCHAIN_BUCKET)
      .getPublicUrl(remotePath);

    if (urlError) {
      throw urlError;
    }
    if (!publicUrlData?.publicUrl) {
      throw new Error(`Unable to resolve public URL for ${remotePath}`);
    }

    uploadedUrls.push(publicUrlData.publicUrl);
    const normalizedName = fileName
      .replace(/\.[^.]+$/, "")
      .replace(/laser marking\s*/gi, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const prettyName = normalizedName
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
    imageNames.push(prettyName || fileName);
    console.log(`Uploaded ${fileName} → "${imageNames.at(-1)}"`);
  }

  const { data: existingRow, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", METAL_KEYCHAIN_PRODUCT_ID)
    .maybeSingle();

  if (fetchError) {
    throw fetchError;
  }

  const existingImages = Array.isArray(existingRow?.images) ? existingRow.images : [];
  const combinedImages = Array.from(new Set([...existingImages, ...uploadedUrls]));
  const existingVariants = Array.isArray(existingRow?.variants) ? existingRow.variants : [];
  const combinedNames = Array.from(new Set([...existingVariants, ...imageNames]));

  const updatedRow = {
    id: METAL_KEYCHAIN_PRODUCT_ID,
    name: existingRow?.name ?? "Metal Keychain",
    price: existingRow?.price ?? 7,
    description:
      existingRow?.description ??
      "Brushed metal keychain with chamfered edges and precision engraving, ideal for executive gifting.",
    category: existingRow?.category ?? "keychains",
    images: combinedImages,
    variants: combinedNames,
    currency: existingRow?.currency ?? "INR",
    gst_rate: existingRow?.gst_rate ?? null,
    list_price: existingRow?.list_price ?? null,
    discount_percent: existingRow?.discount_percent ?? null,
    available_colors: existingRow?.available_colors ?? [],
    product_code: existingRow?.product_code ?? null,
    material: existingRow?.material ?? "Stainless steel",
    packing_type: existingRow?.packing_type ?? null,
    master_carton: existingRow?.master_carton ?? null,
    customized: existingRow?.customized ?? null,
    min_order_qty: existingRow?.min_order_qty ?? null,
  };

  const { error: upsertError } = await supabase
    .from("products")
    .upsert(updatedRow, { onConflict: "id" });

  if (upsertError) {
    throw upsertError;
  }

  console.log(
    `Updated ${METAL_KEYCHAIN_PRODUCT_ID} with ${combinedImages.length} total image(s).`
  );
}

main().catch((error) => {
  console.error("Metal keychain sync failed:", error);
  process.exit(1);
});
