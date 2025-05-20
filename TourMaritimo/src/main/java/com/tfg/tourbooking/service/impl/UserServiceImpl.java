package com.tfg.tourbooking.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tfg.tourbooking.dto.LoginDto;
import com.tfg.tourbooking.dto.UserDto;
import com.tfg.tourbooking.model.User;
import com.tfg.tourbooking.repository.UserRepository;
import com.tfg.tourbooking.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public void registerUser(UserDto dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // hash
        user.setRole(dto.getRole());
        userRepository.save(user);
    }

    @Override
    public User authenticate(LoginDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Contraseña incorrecta");
        }

        return user;
    }
}
