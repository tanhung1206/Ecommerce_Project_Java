package nguyen.tan.hung.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ListProductFilterDto {
    private List<ProductFilterDto> list;
    private Integer curPage;
    private Integer nextPage;
    private Integer prevPage;
    private Long totalPage;
}
