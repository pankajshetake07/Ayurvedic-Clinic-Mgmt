package com.ACMSUserManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AcmsUserManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(AcmsUserManagementApplication.class, args);
	
	}

}
