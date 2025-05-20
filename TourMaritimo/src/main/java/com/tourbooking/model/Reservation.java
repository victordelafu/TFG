package com.tourbooking.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User tourist;

    @ManyToOne
    private Tour tour;

    private LocalDate reservationDate;

    // Getters y setters
}