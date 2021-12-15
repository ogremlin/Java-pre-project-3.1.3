package com.sb_crud.service;

import com.sb_crud.model.Role;
import com.sb_crud.model.User;
import com.sb_crud.repository.RoleRepository;
import com.sb_crud.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findUserById(Long id) {
        return userRepository.findUserById(id);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteUserById(id);
    }

    public User findUserByUsername(String name) {
        return userRepository.findUserByUsername(name);
    }

    public Role findRoleById(Long id) {
        return roleRepository.findRoleById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        System.out.println(user.toString());
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }

        return user;
    }
}
