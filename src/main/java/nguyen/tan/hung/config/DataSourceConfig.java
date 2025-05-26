package nguyen.tan.hung.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

import javax.sql.DataSource;

@Configuration
@PropertySource("classpath:db/jdbc.properties")
public class DataSourceConfig {
    private static Logger LOGGER = LoggerFactory.getLogger(DataSourceConfig.class);

    @Value("${jdbc.driverClassName}")
    private String driverClassName;

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String userName;

    @Value("${jdbc.password}")
    private String password;


    @Bean
    public DataSource dataSource(){
        try{
            HikariConfig hc=new HikariConfig();
            hc.setDriverClassName(driverClassName);
            hc.setJdbcUrl(url);
            hc.setUsername(userName);
            hc.setPassword(password);
            HikariDataSource dataSource=new HikariDataSource(hc);
            dataSource.setMaximumPoolSize(25);
            return dataSource;
        }
        catch (Exception e){
            LOGGER.error("Hikari DataSource bean cannot be created!", e);
            return null;
        }
    }
}
