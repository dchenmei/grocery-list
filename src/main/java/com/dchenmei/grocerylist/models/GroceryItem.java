package com.dchenmei.grocerylist.models;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
public class GroceryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 100)
    private String name;

    private String brand; // can be null, e.g. produce usually have no brand

    @NotNull
    private String category;

    @NotNull
    @Min(1)
    private Integer quantity;

    @Size(max = 500)
    private String comments;

    private boolean completed;

    private Date updatedDate = new Date();
}
