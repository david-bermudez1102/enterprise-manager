import React, { Component } from "react";

class Integrations extends Component {
  render() {
    return (
      <div>
        Account is not connected to any Accounting Software.
        <button>
          <img
            src="https://books.zoho.com/favicon.ico"
            style={{ width: "24px" }}
          />
          Connect with Zoho Books
        </button>
        <button>
          <img
            src="https://quickbooks.intuit.com/etc/designs/harmony/images/favicon/quickbooks/apple-touch-icon-60x60.png"
            style={{ width: "24px" }}
          />
          Connect with QuickBooks
        </button>
      </div>
    );
  }
}

export default Integrations;
