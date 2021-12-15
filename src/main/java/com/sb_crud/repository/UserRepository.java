package com.sb_crud.repository;

import com.sb_crud.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User save(User user);
    List<User> findAll();
    User findUserById(Long id);
    void deleteUserById(Long id);
    User findUserByUsername(String name);
}
