package com.teachandcorrect.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI teachAndCorrectOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("TeachAndCorrect API")
                        .description("API backend de TeachAndCorrect")
                        .version("v1"));
    }
}
