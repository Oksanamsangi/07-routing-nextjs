import Style from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <>
      <p className={Style.error_text}>
        <hr />
        There was an error, please try again...
      </p>
    </>
  );
}