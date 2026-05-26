import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Grupp 8 &copy; {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
