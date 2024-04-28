import {
  updateTransaction,
  deleteTransaction,
  getTransactions,
  fetchSpecificProduct,
} from "@/app/lib/actions";
import { fetchUser } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

const TransactionsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { transactions } = await getTransactions();

  const getProductDetails = async (productId) => {
    try {
      const product = await fetchSpecificProduct(productId);
      return product.product[0].apparatus;
    } catch (error) {
      console.error(
        `Error fetching product details for ID: ${productId}`,
        error,
      );
      return "Unknown";
    }
  };

  const formatDate = (timestamp) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString(undefined, options);
  };

  const getUsername = async (userID) => {
    try {
      const user = await fetchUser(userID);
      return user.username;
    } catch (error) {
      console.error(`Error fetching user details for ID: ${userID}`, error);
      return "Unknown";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a transaction..." />
        <Link href="/dashboard/transactions/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Transaction ID</td>
            <td>Username</td>
            <td>Date</td>
            <td>Products</td>
            <td>Approved</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{getUsername(transaction.userID)}</td>
              <td>{formatDate(transaction.date)}</td>
              <td>
                <ul>
                  {transaction.products.map((product, index) => {
                    const productId = Object.keys(product)[0];
                    return <li key={index}>{getProductDetails(productId)}</li>;
                  })}
                </ul>
              </td>
              <td>{transaction.approved ? "Approved" : "Pending"}</td>
              <td>
                <div className={styles.buttons}>
                  <form action={updateTransaction}>
                    <input type="hidden" name="id" value={transaction._id} />
                    <button className={`${styles.button} ${styles.approve}`}>
                      Approve
                    </button>
                  </form>
                </div>
              </td>
              <td>
                <div className={styles.buttons}>
                  <form action={deleteTransaction}>
                    <input type="hidden" name="id" value={transaction._id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
