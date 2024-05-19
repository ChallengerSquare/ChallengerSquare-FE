import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import styles from './dashboard.module.scss'

const Dashboard: React.FC = () => {
  const [blockCount, setBlockCount] = useState<number | null>(null)
  const [transactionCount, setTransactionCount] = useState<number | null>(null)
  const [nodeCount, setNodeCount] = useState<number | null>(null)
  const [blockSpeed, setBlockSpeed] = useState<number | null>(null)
  const [pendingTransactions, setPendingTransactions] = useState<number | null>(null)
  const [networkStatus, setNetworkStatus] = useState<string | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])

  const scrollRef = useRef<HTMLDivElement>(null)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          blockCountResponse,
          transactionCountResponse,
          nodeCountResponse,
          pendingTransactionsResponse,
          networkStatusResponse,
          blockSpeedResponse,
          transactionsResponse,
        ] = await Promise.all([
          axios.get('https://www.challengersquare.com/api/block-chain/get-block-count'),
          axios.get('https://www.challengersquare.com/api/block-chain/get-all-transactions-count'),
          axios.get('https://www.challengersquare.com/api/block-chain/get-node-count'),
          axios.get('https://www.challengersquare.com/api/block-chain/get-transactions-count'),
          axios.get('https://www.challengersquare.com/api/block-chain/get-network-status'),
          axios.get('https://www.challengersquare.com/api/block-chain/get-mining-period'),
          axios.get('https://www.challengersquare.com/api/block-chain/get-chain'),
        ])

        setBlockCount(blockCountResponse.data.data.result)
        setTransactionCount(transactionCountResponse.data.data.result)
        setNodeCount(nodeCountResponse.data.data.result)
        setBlockSpeed(blockSpeedResponse.data.data.result)
        setPendingTransactions(pendingTransactionsResponse.data.data.result)
        setNetworkStatus(networkStatusResponse.data.data.result)
        setTransactions(transactionsResponse.data.data.chain)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  // Scroll to the right end after transactions are set
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth
    }
  }, [transactions])

  const extractTransactions = (chain: any[]) => {
    const extractedTransactions: any[] = []
    chain.forEach((block) => {
      if (block.body.transactions && block.body.transactions.length > 0) {
        block.body.transactions.forEach((transaction: any) => {
          extractedTransactions.push({
            transaction_id: transaction.transaction_id,
            data: transaction.data,
            type: transaction.type,
            timestamp: transaction.timestamp,
          })
        })
      }
    })
    return extractedTransactions
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Blockchain Dashboard</h1>
      </header>
      <div className={styles.mainContent}>
        <div className={styles.overview}>
          <div className={styles.blocks} ref={scrollRef}>
            {transactions.map((transaction, index) => (
              <div key={index} className={styles.block}>
                <div className={styles.blockContentWrapper}>
                  <p>
                    previous hash: <span className={styles.blockData}>{transaction.body.previous_hash}</span>
                  </p>
                  <p>
                    index: <span className={styles.blockData}>{transaction.body.index}</span>
                  </p>
                  <p>
                    proof: <span className={styles.blockData}>{transaction.body.proof}</span>
                  </p>
                  <p>
                    timestamp: <span className={styles.blockData}>{transaction.body.timestamp}</span>
                  </p>
                  <p>
                    transactions: <span className={styles.blockData}>{transaction.body.transactions.length}</span>
                  </p>
                </div>
                {transactions.length - 1 !== index && <div className={styles.dash} />}
              </div>
            ))}
          </div>
          <div className={styles.statistics}>
            <div className={styles.blockchainInfo}>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{blockCount !== null ? blockCount : 'Loading'}</div>
                <div className={styles.infoLabel}>{'채굴된 블록 수'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{transactionCount !== null ? transactionCount : 'Loading'}</div>
                <div className={styles.infoLabel}>{'총 트랜잭션 수'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{nodeCount !== null ? nodeCount : 'Loading'}</div>
                <div className={styles.infoLabel}>{'참여중인 노드 수'}</div>
              </div>
            </div>
            <div className={styles.blockchainInfo}>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{blockSpeed !== null ? blockSpeed : 'Loading'}</div>
                <div className={styles.infoLabel}>{'블록 생성 속도'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{pendingTransactions !== null ? pendingTransactions : 'Loading'}</div>
                <div className={styles.infoLabel}>{'대기중 트랜잭션'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{networkStatus !== null ? networkStatus : 'Loading'}</div>
                <div className={styles.infoLabel}>{'네트워크 상태'}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.detail}>
          <div className={styles.detailHeader}>
            <div className={styles.dataType}>
              <div className={styles.types}>Transactions</div>
              <div className={styles.types}>nodes</div>
            </div>
            <div className={styles.search}>
              <div className={styles.searchInput}>
                <input type="text" placeholder="Search transactions" />
              </div>
              <div className={styles.searchButton}>Search</div>
            </div>
            {/* 거래 정보 표시 */}
          </div>
          <div className={styles.dataTable}>
            <div className={styles.columnNames}>
              {/* 조건에 따라 내용 추가 */}
              <div className={styles.columnName}>ID</div>
              <div className={styles.columnName}>type</div>
              <div className={styles.columnName}>contents</div>
              <div className={styles.columnName}>timestamp</div>
            </div>
            <div className={styles.dataList}>
              {extractTransactions(transactions).map((transaction, index) => (
                <div key={index} className={styles.dataBox}>
                  <div className={styles.data}>{transaction.transaction_id}</div>
                  <div className={styles.data}>{transaction.type}</div>
                  <div className={styles.data}>{JSON.stringify(transaction.data)}</div>
                  <div className={styles.data}>{transaction.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
