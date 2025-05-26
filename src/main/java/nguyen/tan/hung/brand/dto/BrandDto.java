package nguyen.tan.hung.brand.dto;

import lombok.Getter;
import lombok.Setter;
import nguyen.tan.hung.brand.repo.BrandEntity;
import org.hibernate.Hibernate;

@Getter
@Setter
public class BrandDto {
    private int id;
    private String name;
    private int numProduct;



    public BrandDto(BrandEntity entity){
        id=entity.getId();
        name=entity.getName();
        numProduct= Hibernate.size(entity.getProductList());
    }
}
