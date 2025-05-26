package nguyen.tan.hung.user.repo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class UserRepository {
    @PersistenceContext
    private EntityManager entityManager;
    public UserEntity findUserByEmail(String email) {
        try {
            TypedQuery<UserEntity> query = entityManager.createQuery("from UserEntity u where u.email=:email", UserEntity.class);
            query.setParameter("email", email);
            return query.getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public int save(UserEntity entity) {
        if(entity.getId()==null){
            entityManager.persist(entity);
        }
        else{
            entityManager.merge(entity);
        }
        return entity.getId();
    }

    @Transactional
    public void activeUser(int userId) {
        UserEntity user=entityManager.find(UserEntity.class,userId);
        user.setIsActive(true);
    }
}
