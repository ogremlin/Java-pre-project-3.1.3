package com.sb_crud.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import javax.persistence.*;
import java.util.Set;

// Этот класс реализует интерфейс GrantedAuthority, в котором необходимо переопределить только один метод getAuthority() (возвращает имя роли).
// Имя роли должно соответствовать шаблону: «ROLE_ИМЯ», например, ROLE_USER.

@Data
@Entity
@NoArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "roles")
public class Role implements GrantedAuthority {

    public Role(Long id, String role) {
        this.id = id;
        this.role = role;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "role")
    private String role;

//    @Transient
//    @ManyToMany(mappedBy = "roles")
//    private Set<User> users;

    @Override
    public String getAuthority() {
        return role;
    }
}
