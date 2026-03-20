package com.cv.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CvController {

    @GetMapping("/")
    public String home() {
        return "index";
    }
}
