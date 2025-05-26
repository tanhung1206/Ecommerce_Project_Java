package nguyen.tan.hung.category.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import nguyen.tan.hung.category.repo.CategoryEntity;
import org.hibernate.Hibernate;

@Setter
@Getter
@AllArgsConstructor
public class CategoryDto {
    private int id;
    private String name;
    private long numProduct;

    public CategoryDto(CategoryEntity entity){
        id=entity.getId();
        name=entity.getName();
        numProduct= Hibernate.size(entity.getProductList());
    }
}
