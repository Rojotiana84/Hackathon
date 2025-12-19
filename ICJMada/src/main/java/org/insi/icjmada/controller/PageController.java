package org.insi.icjmada.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String index() {
        return "index"; // index.html
    }

    @GetMapping("/contact")
    public String contact() {
        return "ha_contact";
    }

    @GetMapping("/savoirPlus")
    public String savoirPlus() {
        return "savoirPlus"; // savoirplus.html
    }

    @GetMapping("/verification")
    public String verification() {
        return "verification"; // verification.html
    }
}
