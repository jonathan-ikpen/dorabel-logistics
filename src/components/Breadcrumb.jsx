import React from "react";
import { Link } from "react-router-dom";
import { useBreadcrumbs } from "../utils/seo";

/**
 * Breadcrumb Component with Schema.org markup
 * Automatically validates structure and generates structured data
 */
export const Breadcrumb = ({ items = [] }) => {
  // Ensure home is always first
  const breadcrumbItems =
    items.length > 0 && items[0].url === "/"
      ? items
      : [{ name: "Home", url: "/" }, ...items];

  // Inject breadcrumb schema
  useBreadcrumbs(breadcrumbItems);

  if (breadcrumbItems.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 text-sm"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex flex-wrap items-center gap-2">
        {breadcrumbItems.map((item, index) => (
          <li
            key={index}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center"
          >
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            {index < breadcrumbItems.length - 1 ? (
              <Link
                to={item.url}
                itemProp="item"
                className="text-dorabel-purple hover:text-dorabel-gold transition-colors"
              >
                <span itemProp="name">{item.name}</span>
              </Link>
            ) : (
              <span itemProp="name" className="text-gray-600">
                {item.name}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
