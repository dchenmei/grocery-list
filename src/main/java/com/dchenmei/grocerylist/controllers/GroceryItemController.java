package com.dchenmei.grocerylist.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

// Note: Because we implement full MVC within this module, this regular controller serves the view not microservice

@Controller
public class GroceryItemController {
    @GetMapping("/")
    public String list() {
        return "grocery";
    }
}
