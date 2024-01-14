package ma.fstg.stocky.zynerator.security.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ma.fstg.stocky.zynerator.security.bean.Permission;

public interface PermissionDao extends JpaRepository<Permission, Long> {
    public Permission findByName(String name);
}
