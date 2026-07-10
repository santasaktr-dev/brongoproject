# BRONGO Mix Lab MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** สร้าง vertical-slice MVP ที่ผู้ใช้เล่นเกมและอ่านข้อมูล BRONGO ได้ครบ flow

**Architecture:** Next.js App Router แยก content, pure game engine, persistent provider และ page components ออกจากกัน ใช้ asset ที่อนุมัติและ sessionStorage ฝั่ง client

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library

---

### Task 1: Bootstrap and assets

- [ ] สร้าง Next.js project ใน `brongo-mix-lab/` พร้อม TypeScript, App Router, Tailwind และ ESLint
- [ ] เพิ่ม Vitest, jsdom และ Testing Library พร้อม scripts `test`, `typecheck`
- [ ] คัดลอก asset ที่อนุมัติไป `public/brand/` ตาม naming guide

### Task 2: Content and game engine (TDD)

- [ ] เขียน failing tests สำหรับคะแนน 100, 60, 0, empty และ rounding
- [ ] เพิ่ม typed ingredient dataset จาก `docs/ingredient-master.md`
- [ ] implement scoring และ reaction selector ให้ tests ผ่าน
- [ ] เขียน failing reducer tests สำหรับ toggle, functional exclusivity และ reset
- [ ] implement reducer และ persistence validation ให้ tests ผ่าน

### Task 3: Shared UI and landing

- [ ] เพิ่ม design tokens, global accessibility styles, header, button, mascot และ product visual
- [ ] สร้าง Landing พร้อม approved copy, disclaimer, CTA และ responsive hero

### Task 4: Mix Lab

- [ ] สร้าง GameProvider และ ingredient cards จาก dataset
- [ ] สร้าง ingredient groups, selection live region, liquid vessel และ disabled CTA
- [ ] เพิ่ม clear confirmation และ mixing transition ที่รองรับ reduced motion

### Task 5: Result and product information

- [ ] สร้าง Result พร้อม score, reaction, match labels, fun facts และ navigation actions
- [ ] สร้างหน้า BRONGO พร้อม summary, safety accordion, FAQ และ product CTA

### Task 6: Verification and local preview

- [ ] รัน unit tests, lint, typecheck และ production build
- [ ] รัน local server และตรวจ flow หลักใน browser ที่ mobile/desktop
- [ ] แก้ข้อผิดพลาดที่พบและรัน verification ซ้ำ

