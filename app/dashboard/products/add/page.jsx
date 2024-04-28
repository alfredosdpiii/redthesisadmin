import { addProduct } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";


const AddProductPage = () => {

  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" placeholder="apparatus" name="apparatus" required />
        <select name="cat" id="cat">
          <option value="general">Choose a Category</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
        </select>
        <input type="number" placeholder="estimated price" name="price" required />
        <input type="number" placeholder="quantity" name="quantity" required />
        <input type="text" placeholder="Date of Replacement" name="date" />
        <input type="text" placeholder="size" name="size" />
        <textarea
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;