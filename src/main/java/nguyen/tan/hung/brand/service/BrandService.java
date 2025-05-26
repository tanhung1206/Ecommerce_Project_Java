package nguyen.tan.hung.brand.service;

import nguyen.tan.hung.brand.dto.BrandDto;
import nguyen.tan.hung.brand.repo.BrandEntity;

import java.util.List;

public interface BrandService {
    public List<BrandDto> findAll();
}
