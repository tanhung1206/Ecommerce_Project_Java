package nguyen.tan.hung.brand.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import nguyen.tan.hung.brand.dto.BrandDto;
import nguyen.tan.hung.brand.repo.BrandEntity;
import nguyen.tan.hung.brand.repo.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service("brandServiceImpl")
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    @Autowired
    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Transactional
    @Override
    public List<BrandDto> findAll() {
        List<BrandEntity> brandEntities = brandRepository.findAll();
        List<BrandDto> brandDtos = brandEntities.stream().map(BrandDto::new).toList();
        return brandDtos;
    }
}
