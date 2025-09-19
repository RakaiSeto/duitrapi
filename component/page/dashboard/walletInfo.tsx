import { formatDateTime } from '@/utils/Time';
import { WalletsWithLatestTransactions } from '@/db/dal/wallets';
import { Fragment } from 'react';

export default function WalletInfo({ wallets }: { wallets: WalletsWithLatestTransactions[] }) {
    return (
        <div className="card p-6 rounded-2xl shadow-lg bg-white dark:bg-[#1f2a47]">
            <h2 className="text-xl font-semibold mb-4">My Pockets</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm pocket-table">
                    <thead>
                        <tr className="bg-[#f0f0f0] dark:bg-gray-700 rounded-lg text-xs uppercase text-left">
                            <th className="py-3 px-4 font-medium rounded-l-xl min-w-[120px]">Pocket Name</th>
                            <th className="py-3 px-4 font-medium min-w-[120px]">Balance</th>
                            <th className="py-3 px-4 font-medium min-w-[160px]">Last Transaction Date</th>
                            <th className="py-3 px-4 font-medium rounded-r-xl min-w-[200px]">Last Transaction Nominal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wallets.map((wallet) => (
                            <Fragment key={wallet.walletId}>
                                <tr className="border-b border-gray-700">
                                    <td className="py-4 px-4 font-medium">{wallet.walletName}</td>
                                    <td className="py-4 px-4">{wallet.walletBalance.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                    <td className="py-4 px-4">{wallet.latestTransactionDate ? formatDateTime(wallet.latestTransactionDate) : '-'}</td>
                                    <td className={`py-4 px-4 ${wallet.latestTransactionNominal != null ? (wallet.latestTransactionNominal < 0 ? 'text-red-400' : 'text-green-400') : ''}`}>
                                        {wallet.latestTransactionNominal != null ? wallet.latestTransactionNominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '-'}
                                    </td>
                                </tr>
                            </Fragment>
                        ))}
                        {wallets.length === 0 && (
                            <tr className="border-b border-gray-700">
                                <td colSpan={4} className="py-4 px-4 font-medium text-center">
                                    No Data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
