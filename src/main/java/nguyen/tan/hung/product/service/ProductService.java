package nguyen.tan.hung.product.service;

import jakarta.validation.Valid;
import nguyen.tan.hung.product.dto.ListProductFilterDto;
import nguyen.tan.hung.product.dto.ProductDetailDto;
import nguyen.tan.hung.product.dto.ProductFilterDto;
import nguyen.tan.hung.product.dto.ProductFilterRequest;
import nguyen.tan.hung.product.repository.ProductEntity;

import java.util.List;

public interface ProductService {
    public List<ProductEntity> findAll();
    public ListProductFilterDto getFilterProduct();

    ListProductFilterDto getFilterProduct(ProductFilterRequest productFilterRequest);
    ProductDetailDto getProductDetail(Integer id);

    List<ProductFilterDto> getRelatedProduct(Integer id);
}
