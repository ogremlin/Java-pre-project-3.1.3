package com.sb_crud.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sb_crud.model.User;
import com.sb_crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RestApiController {

    @Autowired
    private UserService userService;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/users")
    public List<User> allUsers() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @PostMapping("/user")
    public ResponseEntity<User> newUser(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id) {
         User user = userService.findUserById(id);
         userService.deleteUserById(id);
         return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
