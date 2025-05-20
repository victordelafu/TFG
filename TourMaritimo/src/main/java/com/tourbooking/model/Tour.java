package com.tourbooking.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String port;
    private double price;
    private LocalDate date;

    @ManyToOne
    private User owner;

    // Getters y setters
}