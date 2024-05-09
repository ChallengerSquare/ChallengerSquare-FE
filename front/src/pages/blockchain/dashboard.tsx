import styles from './dashboard.module.scss'

const Dashboard = () => {
  // 블록 정보, 거래 정보 등 데이터를 상태로 관리할 수 있습니다.
  // useState, useEffect를 사용하여 데이터를 fetch하고 상태에 저장합니다.

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
                <div className={styles.infoValue}>{'50'}</div>
                <div className={styles.infoLabel}>{'정보 이름'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{'50'}</div>
                <div className={styles.infoLabel}>{'정보 이름'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{'50'}</div>
                <div className={styles.infoLabel}>{'정보 이름'}</div>
              </div>
            </div>
            <div className={styles.blockchainInfo}>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{'50'}</div>
                <div className={styles.infoLabel}>{'정보 이름'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{'50'}</div>
                <div className={styles.infoLabel}>{'정보 이름'}</div>
              </div>
              <div className={styles.infoBox}>
                <div className={styles.infoValue}>{'50'}</div>
                <div className={styles.infoLabel}>{'정보 이름'}</div>
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
