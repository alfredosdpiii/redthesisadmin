import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Inventory</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Apparatus</td>
            <td>Status</td>
            <td>Date</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Microscope
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>
                Operational
              </span>
            </td>
            <td>14/02/2024</td>
            <td>8</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Glass Slide
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Operational</span>
            </td>
            <td>14/02/2024</td>
            <td>10</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Granulated Cylinder
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Unoperational
              </span>
            </td>
            <td>14/02/2024</td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Beaker
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Unoperational
              </span>
            </td>
            <td>14/02/2024</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
