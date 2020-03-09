package com.dchenmei.grocerylist.services;

import com.dchenmei.grocerylist.mappers.GroceryItemRepository;
import com.dchenmei.grocerylist.models.GroceryItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroceryItemService {
    private final GroceryItemRepository stockRepository;

    public List<GroceryItem> findAll() {
        return stockRepository.findAll();
    }

    public List<GroceryItem> saveAll(List<GroceryItem> groceryItems) {
        return stockRepository.saveAll();
    }

    // We can have a delete and update but the same effect can be achieved with just find and save
}
