package com.sb_crud.controller;

import com.sb_crud.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class RestUserController {

    @GetMapping(value = "/user")
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok().body((User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal());
    }
}
