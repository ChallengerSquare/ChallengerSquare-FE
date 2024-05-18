import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const [blockCount, setBlockCount] = useState<number | null>(null)
  const [transactionCount, setTransactionCount] = useState<number | null>(null)
  const [nodeCount, setNodeCount] = useState<number | null>(null)
  const [blockSpeed, setBlockSpeed] = useState<number | null>(null)
  const [pendingTransactions, setPendingTransactions] = useState<number | null>(null)
  const [networkStatus, setNetworkStatus] = useState<string | null>(null)

  useEffect(() => {
    // Function to fetch data from all APIs
    const fetchData = async () => {
      try {
        const blockCountResponse = await axios.get('https://www.challengersquare.com/api/block-chain/get-block-count')
        const transactionCountResponse = await axios.get(
          'https://www.challengersquare.com/api/block-chain/get-all-transactions-count',
        )
        const nodeCountResponse = await axios.get('https://www.challengersquare.com/api/block-chain/get-node-count')
        const pendingTransactionsResponse = await axios.get(
          'https://www.challengersquare.com/api/block-chain/get-transactions-count',
        )
        const networkStatusResponse = await axios.get(
          'https://www.challengersquare.com/api/block-chain/get-network-status',
        )
        const blockSpeedResponse = await axios.get('https://www.challengersquare.com/api/block-chain/get-mining-period')

        setBlockCount(blockCountResponse.data.data.result)
        setTransactionCount(transactionCountResponse.data.data.result)
        setNodeCount(nodeCountResponse.data.data.result)
        setBlockSpeed(blockSpeedResponse.data.data.result)
        setPendingTransactions(pendingTransactionsResponse.data.data.result)
        setNetworkStatus(networkStatusResponse.data.data.result)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Blockchain Dashboard</h1>
      </header>
      <div className={styles.mainContent}>
        <div className={styles.overview}>
          <div className={styles.blocks}>{'contents'}</div>
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
              <div className={styles.columnName}>block number</div>
              <div className={styles.columnName}>contents</div>
              <div className={styles.columnName}>timestamp</div>
            </div>
            <div className={styles.dataList}>
              <div className={styles.dataBox}>
                <div className={styles.data}>58865349-7b29-4328-ae01-78233765f5b2</div>
                <div className={styles.data}>participation</div>
                <div className={styles.data}>288</div>
                <div className={styles.data}>
                  &quot;attendee_name&quot;: &quot;김영희&quot;, &quot;code&quot;: &quot;PART67890&quot;,
                  &quot;details&quot;: &quot;참가자 전원에게 기념품 제공&quot;, &quot;event_date&quot;:
                  &quot;2023-05-02&quot;
                </div>
                <div className={styles.data}>2024-05-07T16:58:10.351843</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
