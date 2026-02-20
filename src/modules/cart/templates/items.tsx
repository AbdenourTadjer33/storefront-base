import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@components/ui/heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@components/ui/table"
import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
import { useTranslations } from "next-intl"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const t = useTranslations("templates.cart")
  const items = cart?.items
  return (
    <div className="space-y-4">
      <div className="pb-3 flex items-center">
        <Heading level="h3">{t("title")}</Heading>
      </div>

      {/* <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-ui-fg-subtle txt-medium-plus">
            <Table.HeaderCell className="pl-0!">{t("item")}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{t("qty")}</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              {t("price")}
            </Table.HeaderCell>
            <Table.HeaderCell className="pr-0! text-right">
              {t("total")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table> */}

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 text-muted-foreground font-medium">
            <TableCell className="">{t("item")}</TableCell>
            <TableCell></TableCell>
            <TableCell>{t("qty")}</TableCell>
            <TableCell className="hidden small:table-cell">
              {t("price")}
            </TableCell>
            <TableCell className="rtl:text-left ltr:text-right">
              {t("total")}
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </TableBody>
      </Table>
    </div>
  )
}

export default ItemsTemplate
