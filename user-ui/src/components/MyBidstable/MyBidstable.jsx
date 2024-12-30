import React, {useEffect, useState, useContext} from 'react'
import ReactPaginate from 'react-paginate';
import '../../css/Style.css';
import { TransactionContext } from '../../context/TransactionContext';
import { BidderContext } from '../../context/BidderContext';
import { CardSpotlight } from '../CardCmpnt/Cardd';


const MyBidstable = ({data}) => {
  const { depositBid, refundBid, bidData} = useContext(BidderContext);
  const { connectWallet, currentAccount, AcceptBid} = useContext(TransactionContext);  
  const [currentItems, setCurrentItems] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  
  return (
    <CardSpotlight className="h-auto w-full mx-auto px-4 py-6">
      <div className="relative z-20">
        <p className="text-xl font-bold mt-2 text-white">Bid Details</p>
        <p className="text-neutral-300 mt-4">
          Below is the list of bids placed on your IPs. You can refund, view acceptance status, and manage bid ownership.
        </p>
        <div className="mt-6">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse border border-gray-200 bg-white">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">IP Name</th>
                  <th className="px-4 py-2">Bidder Address</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Transfer Ownership</th>
                  <th className="px-4 py-2">Bidding Acceptance</th>
                  <th className="px-4 py-2">Bid Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{index || "index"}</td>
                    <td className="px-4 py-2">{item.ownerIPname || "owner name"}</td>
                    <td className="px-4 py-2 text-gray-700">{item.bidderAddress || " address"}</td>
                    <td className="px-4 py-2">{item.bidValue || " bidvalue"} ether</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="bg-black text-white py-1 px-4 rounded"
                        onClick={(event) => refundBid(item.bidValue, item.tokenID, event)}
                      >
                        Refund
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">{item.bidAccepted || "accepted"}</td>
                    <td className="px-4 py-2">{item.timestamp || " timestamp"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              containerClassName="pagination flex justify-center space-x-2 mt-4"
              pageLinkClassName="page-num px-3 py-1 border rounded text-gray-700 hover:bg-gray-200"
              previousLinkClassName="page-num px-3 py-1 border rounded text-gray-700 hover:bg-gray-200"
              nextLinkClassName="page-num px-3 py-1 border rounded text-gray-700 hover:bg-gray-200"
              activeLinkClassName="active bg-gray-800 text-white"
            />
          </div>
        </div>
      </div>
    </CardSpotlight>
  )
}

export default MyBidstable