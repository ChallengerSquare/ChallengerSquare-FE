package com.ssafy.challs.global.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.zaxxer.hikari.HikariDataSource;

@EnableTransactionManagement
@Configuration
public class DataSourceConfig {

	// 이렇게 하면 application.yml에 설정된 정보를 가지고 잘 만들어준다
	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.master.hikari")
	public DataSource masterDataSource() {
		return DataSourceBuilder.create().type(HikariDataSource.class).build();
	}

	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.slave.hikari")
	public DataSource slaveDataSource() {
		HikariDataSource dataSource = DataSourceBuilder.create().type(HikariDataSource.class).build();
		// readOnly 설정을 해 두면 쿼리문 최적화를 해서 성능 향상 가능성이 있음
		dataSource.setReadOnly(true);
		return dataSource;
	}

	// 2개의 데이터 소스 중 어디로 연결을 시킬지 선택하는 메소드
	@Bean
	public DataSource routingDataSource(@Qualifier("masterDataSource") DataSource masterDataSource,
		@Qualifier("slaveDataSource") DataSource slaveDataSource) {

		// 2개의 데이터 소스의 정보를 하나의 맵에 관리
		Map<Object, Object> targetDataSources = new HashMap<>();
		targetDataSources.put("master", masterDataSource);
		targetDataSources.put("slave", slaveDataSource);

		// @Transactional 에서 readOnly 옵션의 여부에 따라서 다르게 반환해줌
		AbstractRoutingDataSource routingDataSource = new AbstractRoutingDataSource() {
			@Override
			protected Object determineCurrentLookupKey() {
				// readOnly 옵션의 여부에 따라서 다르게 반환해줌
				return TransactionSynchronizationManager.isCurrentTransactionReadOnly() ? "slave" : "master";
			}
		};

		// 실제 데이터 소스 맵을 연결
		routingDataSource.setTargetDataSources(targetDataSources);

		return routingDataSource;
	}

	// 위에서 생성된 routingDataSource를 사용하도록 설정을 한 다음에 LazyConnectionDataSourceProxy 를 감싸서 실제로 데이터 소스와의 연결이 필요할 때 연결을 생성한다
	@Primary
	@Bean
	public DataSource dataSource(@Qualifier("routingDataSource") DataSource routingDataSource) {
		return new LazyConnectionDataSourceProxy(routingDataSource);
	}

	// entityManager 설정
	@Bean
	public LocalContainerEntityManagerFactoryBean entityManagerFactory(@Qualifier("dataSource") DataSource dataSource) {
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		// 연결에 사용할 데이터소스 선택 여기에서는 위에서 선택이 된 dataSource 가 들어감
		em.setDataSource(dataSource);
		// Repository 를 스캔할 패키지를 선택 (하위 패키지는 모두 선택이 된다)
		em.setPackagesToScan("com.ssafy.challs");
		// Mysql 을 사용하기 때문에 Mysql 설정
		em.setPersistenceUnitName("MySQL");

		// hibernate 설정
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		// sql 을 보여주는 설정
		vendorAdapter.setShowSql(true);
		// entityManager 에 해당 설정 추가
		em.setJpaVendorAdapter(vendorAdapter);

		// entityManager 에 추가를 할 설정을 저장
		Map<String, Object> properties = new HashMap<>();
		// ddl auto 설정
		properties.put("hibernate.hbm2ddl.auto", "update");
		// entityManager 에 설정 추가
		em.setJpaPropertyMap(properties);
		em.afterPropertiesSet();

		return em;
	}

	// Transactional 을 관리할 때 위에서 생성한 entityManager 를 사용해서 관리를 할 수 있도록 설정
	@Bean
	public PlatformTransactionManager transactionManager(
		@Qualifier("entityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(entityManagerFactory.getObject());
		return transactionManager;
	}

}
