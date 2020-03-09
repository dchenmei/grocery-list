package com.dchenmei.grocerylist.mappers;

import com.dchenmei.grocerylist.models.GroceryItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroceryItemRepository extends JpaRepository<GroceryItem, Long> {
}
