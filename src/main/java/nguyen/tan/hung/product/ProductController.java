package nguyen.tan.hung.product;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import nguyen.tan.hung.brand.dto.BrandDto;
import nguyen.tan.hung.brand.service.BrandService;
import nguyen.tan.hung.category.dto.CategoryDto;
import nguyen.tan.hung.category.service.CategoryService;
import nguyen.tan.hung.config.GlobalConfig;
import nguyen.tan.hung.product.dto.*;
import nguyen.tan.hung.product.repository.ReviewEntity;
import nguyen.tan.hung.product.service.ProductService;
import nguyen.tan.hung.product.service.ReviewService;
import nguyen.tan.hung.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final BrandService brandService;
    private final CategoryService categoryService;
    private final UserService userService;
    private final ReviewService reviewService;

    public ProductController(@Qualifier("productServiceImpl") ProductService productService,
                             @Qualifier("brandServiceImpl") BrandService brandService,
                             @Qualifier("categoryServiceImpl") CategoryService categoryService,
                             UserService userService,
                             @Qualifier("reviewServiceImpl") ReviewService reviewService) {
        this.productService = productService;
        this.brandService = brandService;
        this.categoryService = categoryService;
        this.userService = userService;
        this.reviewService = reviewService;
    }

    @GetMapping({"/", ""})
    public String getFilteredProduct(
            @Valid ProductFilterRequest productFilterRequest, BindingResult bindingResult,
            Model model
    ) {
        List<BrandDto> brandList=brandService.findAll();
        List<CategoryDto>categoryList=categoryService.findAll2();
//        model.addAttribute("productList", productService.getFilterProduct());
//        model.addAttribute("productList", productService.findAll());
        ListProductFilterDto productList=null;
        if(!bindingResult.hasErrors()){
            productList=productService.getFilterProduct(productFilterRequest);
        }
        else{
            productList=new ListProductFilterDto(null,null,null,null,null);
        }
        model.addAttribute("productList",productList);
        model.addAttribute("brandList", brandList);
        model.addAttribute("categoryList",categoryList);
        model.addAttribute("SORT_OPTIONS", GlobalConfig.SORT_OPTIONS);
        return "products";
    }

    @GetMapping("/{id}")
    public String getProductDetail(@PathVariable(name = "id") Integer id,Model model) {
        ProductDetailDto productDetail=productService.getProductDetail(id);
        List<ProductFilterDto>relatedProductList=productService.getRelatedProduct(id);

//        List<ReviewEntity> reviewEntities=reviewService.getReviewList(id);

        model.addAttribute("productDetail",productDetail);
        model.addAttribute("relatedProductList",relatedProductList);
        return "product-detail";
    }
    @PostMapping("/{productId}/review")
    public String addReview(@PathVariable(name="productId")Integer productId, @Valid ReviewDto reviewDto, BindingResult result, HttpSession session){
        if(result.hasErrors()){

        }
        else{
            int userId= (int) session.getAttribute("userId");
            reviewDto.setUserId(userId);
            reviewDto.setProductId(productId);
//            userService.saveReview(reviewDto);
            reviewService.saveReview(reviewDto);
        }
        return "redirect:/products/"+productId;
    }
    @ResponseBody
    @GetMapping("/{productId}/review")
    public List<ReviewEntity> addReview(@PathVariable("productId")Integer productId,@RequestParam("page")Integer page){
        return reviewService.getReviewList(productId,page);
    }
}
