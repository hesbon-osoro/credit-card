import './App.css';

function App() {
  return (
    <form className="credit-card">
      <div className="front">
        <div className="card-data-row">
          <div className="brand-name">WAZIMU Bank</div>
          <img src="visa.svg" data-logo className="logo" alt="visa" />
        </div>
        <fieldset className="form-group">
          <legend>Card Number</legend>
          <label htmlFor="cc-1">Card Number</label>
          <div
            data-connected-inputs
            className="cc-inputs horizontal-input-stack"
          >
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card First 4 Digits"
              id="cc-1"
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card Second 4 Digits"
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card Third 4 Digits"
              required
              pattern="[0-9]{4}"
            />
            <input
              type="tel"
              maxLength={4}
              aria-label="Credit Card Last 4 Digits"
              required
              pattern="[0-9]{4}"
            />
          </div>
        </fieldset>
        <div className="input-row">
          <div className="form-group name-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <fieldset className="form-group">
            <legend>Expiration</legend>
            <label htmlFor="expiration-month">Expiration</label>
            <div className="horizontal-input-stack">
              <select
                id="expiration-month"
                aria-label="Expiration Month"
                required
              >
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select
                id="expiration-year"
                aria-label="Expiration Year"
                required
                data-expiration-year
              ></select>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="back">
        <div className="stripe"></div>
        <div className="form-group cvc-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="tel"
            className="cvc-input"
            maxLength={3}
            id="cvc"
            required
          />
        </div>
      </div>
    </form>
  );
}

export default App;
