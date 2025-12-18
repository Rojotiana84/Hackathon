package org.insi.icjmada.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class VerificationController {

    @GetMapping("/")
    public String home() {
        return "index"; // index.html
    }
}
