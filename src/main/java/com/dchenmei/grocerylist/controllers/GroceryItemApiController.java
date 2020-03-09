package com.dchenmei.grocerylist.controllers;

import com.dchenmei.grocerylist.models.GroceryItem;
import com.dchenmei.grocerylist.services.GroceryItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/groceries")
@Slf4j
public class GroceryItemApiController {
    private final GroceryItemService groceryItemService;

    @Autowired
    public GroceryItemApiController(GroceryItemService groceryItemService) {
        this.groceryItemService = groceryItemService;
    }

    @GetMapping
    public ResponseEntity<List<GroceryItem>> findAll() {
        return ResponseEntity.ok(groceryItemService.findAll());
    }

    @PostMapping ResponseEntity saveAll(@Valid @RequestBody List<GroceryItem> groceryItems) {
        log.info(groceryItems.toString());
        return ResponseEntity.ok(groceryItemService.saveAll(groceryItems));
    }
}
