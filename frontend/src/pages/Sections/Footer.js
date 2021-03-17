import React from "react";
import T from "i18n-react";

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          fontSize: "1.5rem",
          padding: "1rem",
          justifySelf: "flex-end",
          textAlign: "center",
          marginTop: "auto"
        }}
      >
        <p>
          <span>
            {T.translate("footer.copyright")} &copy; {new Date().getFullYear()}
            &nbsp;
            <a href="/" target="_blank" rel="noopener noreferrer">
              <T.span text="footer.insight" />
            </a>
            ,
            <T.span text="footer.all_rights_reserved" />
          </span>
        </p>
      </footer>
    );
  }
}
export default Footer;
