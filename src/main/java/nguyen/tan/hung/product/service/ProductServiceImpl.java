package nguyen.tan.hung.product.service;

import nguyen.tan.hung.config.GlobalConfig;
import nguyen.tan.hung.product.dto.ListProductFilterDto;
import nguyen.tan.hung.product.dto.ProductDetailDto;
import nguyen.tan.hung.product.dto.ProductFilterDto;
import nguyen.tan.hung.product.dto.ProductFilterRequest;
import nguyen.tan.hung.product.repository.ProductEntity;
import nguyen.tan.hung.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("productServiceImpl")
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<ProductEntity> findAll() {
        return productRepository.findAll();
    }

    @Override
    public ListProductFilterDto getFilterProduct() {
        return ListProductFilterDto
                .builder()
                .prevPage(4)
                .curPage(5)
                .nextPage(6)
                .totalPage(15L)
                .build();
    }

    @Override
    public ListProductFilterDto getFilterProduct(ProductFilterRequest productFilterRequest) {
        Integer page=productFilterRequest.getPage();
        if(page==null){
            productFilterRequest.setPage(1);
            page=1;
        }
        List<ProductFilterDto>productFilterDtos=productRepository.getListProductFiltered(productFilterRequest);
        Long totalPage=(long)Math.ceil((double) productRepository.getNumberProductFiltered(productFilterRequest)/ GlobalConfig.limit);
        Integer nextPage=page+1<=totalPage?page+1:null;
        Integer prevPage=page-1>=1?page-1:null;
        return new ListProductFilterDto(productFilterDtos,page,nextPage,prevPage,totalPage);
    }

    @Override
    public ProductDetailDto getProductDetail(Integer id) {
        return productRepository.getProductDetail(id);
    }

    @Override
    public List<ProductFilterDto> getRelatedProduct(Integer id) {
        return productRepository.getRelatedProduct(id);
    }


}
