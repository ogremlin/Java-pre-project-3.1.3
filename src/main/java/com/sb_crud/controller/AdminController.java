package com.sb_crud.controller;

import com.sb_crud.model.User;
import com.sb_crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;

@Controller
public class AdminController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserService userService;

    @GetMapping(value = "/admin/manage")
    public String printUsers(ModelMap model) {
        model.addAttribute("messages", userService.findAll());
        return "manage";
    }

    @GetMapping("/admin/new_user")
    public String newUser() {
        return "new_user";
    }

    @PostMapping(value = "/new_user")
    public String addUser(@RequestParam("name") String name, @RequestParam("password") String password,
                          @RequestParam("email") String email, @RequestParam("role") ArrayList<Long> role) {
        User user = new User();
        user.setUsername(name);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setEmail(email);
        user.setRoles(role.stream().map((r) -> userService.findRoleById(r)).collect(Collectors.toSet()));
        userService.save(user);

        return "redirect:/admin/manage";
    }
    @Transactional
    @GetMapping("/admin/delete")
    public String deleteUser(@RequestParam("id") long id) {
        userService.deleteUserById(id);
        return "redirect:/admin/manage";
    }

    @PostMapping(value = "/update_user")
    public String updateUser(@RequestParam("id") long id, @RequestParam("username") String username, @RequestParam("password") String password,
                             @RequestParam("email") String email, @RequestParam("role") Long role) {
        User user = new User();
        user.setId(id);
        user.setUsername(username);
        user.setPassword(bCryptPasswordEncoder.encode(password));
        user.setEmail(email);
        user.setRoles(Collections.singleton(userService.findRoleById(role)));
        userService.save(user);

        return "redirect:/admin/manage";
    }

    @GetMapping("/admin/update_form")
    public String showUpdateForm(@RequestParam("id") long id, Model model) {
        model.addAttribute("user", userService.findUserById(id));
        return "update_user";
    }


}
