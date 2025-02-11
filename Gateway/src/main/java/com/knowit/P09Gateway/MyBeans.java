package com.knowit.P09Gateway;
import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;


@Configuration
public class MyBeans {

	 //http://localhost:8080/api1/welcome   --  localhost:8081
	 //http://localhost:8080/api1/welcome   -- localhost:8082
	
	
	@Bean
	CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOrigins(Arrays.asList("http://localhost:3009")); // Ensure it matches your frontend URL
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setExposedHeaders(Arrays.asList("Authorization")); // Expose headers if needed
	    
	    source.registerCorsConfiguration("/**", config);

	    return new CorsWebFilter(source);
	}

	
	@Bean
	public RouteLocator customRouterLocator(RouteLocatorBuilder builder) {
		return builder.routes() 
				.route("ACMSUserManagement",r->r.path("/auth/**")
					//.uri("http://localhost:8081"))   
					 .uri("lb://ACMSUserManagement"))
				.route("ACMSystem",r->r.path("/service2/**")
					 //.uri("httACMSystemp://localhost:8082"))
					 .uri("lb://ACMSystem"))
				.route("P09ConsultPatient",r->r.path("/api/**")
						 //.uri("httACMSystemp://localhost:8082"))
						 .uri("lb://P09ConsultPatient"))
				.build();
		
	}
}

