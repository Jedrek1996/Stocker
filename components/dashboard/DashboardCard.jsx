import { mockUserInput } from "@/data/mock";

const DashboardCard = ({ stockQuote }) => {
  return (
    <>
      <div className="flex gap-5">
        <div className="card bg-neutral text-neutral-content w-1/4">
          <div className="card-body ">
            <h2 className="card-title">{mockUserInput.stockName}</h2>
            <p>{mockUserInput.stockPrice}</p>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-1/4">
          <div className="card-body ">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-1/4">
          <div className="card-body ">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-1/4">
          <div className="card-body ">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
          </div>
        </div>
      </div>

      <div>
        <h2>Stock Quote</h2>
        <p>
          <strong>Current Price:</strong> ${stockQuote.c}
        </p>
        <p>
          <strong>High Price of the Day:</strong> ${stockQuote.h}
        </p>
        <p>
          <strong>Low Price of the Day:</strong> ${stockQuote.l}
        </p>
        <p>
          <strong>Open Price of the Day:</strong> ${stockQuote.o}
        </p>
        <p>
          <strong>Previous Close Price:</strong> ${stockQuote.pc}
        </p>
      </div>
    </>
  );
};

export default DashboardCard;

// Need user to add their inputs in... store this data in BE
//Once done do the below...

////Total Assets, Loss Profit Percentage, NetIcome, Somerthing else
