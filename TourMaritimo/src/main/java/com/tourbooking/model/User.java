package com.tourbooking.model;

import jakarta.persistence.*;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String role; // "TURISTA" o "PROPIETARIO"

    // Getters y setters
}