import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("Something Went Wrong");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create / Edit Cabin
  let query = supabase.from("cabins");
  // 2. (A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // 3. (B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Something Went Wrong");
  }
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
}

export async function deleteCains(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Something Went Wrong");
  }
  return data;
}
