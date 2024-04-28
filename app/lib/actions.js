"use server";

import { revalidatePath } from "next/cache";
import { Product, User, Transaction } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key],
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (formData) => {
  const { apparatus, cat, desc, price, quantity, date, size } =
    Object.fromEntries(formData);
  console.log("GAGO", formData);
  try {
    connectToDB();

    const newProduct = new Product({
      apparatus,
      cat,
      desc,
      price,
      quantity,
      date,
      size,
    });
    const saveProduct = await newProduct.save();
    console.log(saveProduct);
  } catch (err) {
    console.log(JSON.stringify(err));
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (formData) => {
  const { id, apparatus, desc, price, quantity, date, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      apparatus,
      desc,
      price,
      quantity,
      date,
      size,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key],
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};

export const getTransactions = async () => {
  revalidatePath("/dashboard/borrowers");
  try {
    connectToDB();
    const transactions = await Transaction.find();
    return { transactions };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transactions!");
  }
};

export const updateTransaction = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      approved: true,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key],
    );

    await Transaction.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const fetchSpecificProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.find({ _id: id });
    console.log("helloPRODUCT", product);
    return { product };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const deleteTransaction = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await Transaction.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete transaction!");
  }

  revalidatePath("/dashboard/borrowers");
};
